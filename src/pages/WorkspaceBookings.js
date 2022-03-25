import { useState, useEffect } from 'react';
import faker from 'faker';
import { sample } from 'lodash';
import { collection, getDocs } from 'firebase/firestore';
import { Card, Stack, Container, Typography } from '@mui/material';
import Table from '../components/Table';
import Page from '../components/Page';
import { db } from '../utils/firebase';

import { mockImgAvatar } from '../utils/mockImages';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const minutes = ['00', 15, 30, 45];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const ampm = ['AM', 'PM'];
const statuses = ['Active', 'Upcoming', 'Checked Out'];

const randomLetter = () => sample(alphabet);

const ACTIVE_TABLE_HEADINGS = [
  { id: 'name', label: 'Guest Name', alignRight: false },
  { id: 'checkIn', label: 'Check-In Time', alignRight: false },
  { id: 'checkOut', label: 'Checked Out', alignRight: false },
  { id: 'tableLocation', label: 'Table Location', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
];

const getStatus = (checkIn, checkOut) => {
  const checkInDate = checkIn && new Date(checkIn?.seconds * 1000);
  const checkOutDate = checkOut && new Date(checkOut?.seconds * 1000);
  const currentDate = new Date();
  if (checkInDate > currentDate) {
    return 'Upcoming';
  }
  if (currentDate > checkInDate && !checkOutDate) {
    return 'Active';
  }
  return 'Checked Out';
};

// todo: add filter buttons

const WorkspaceBookings = () => {
  const [bookings, setBookings] = useState([]);
  const bookingCollectionRef = collection(db, 'bookings');

  useEffect(() => {
    const getBookings = async () => {
      const data = await getDocs(bookingCollectionRef);
      setBookings(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          status: getStatus(doc.data()?.checkIn, doc.data().checkOut),
          checkIn:
            doc.data().checkIn &&
            new Date(doc.data().checkIn?.seconds * 1000).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            }),
          checkOut:
            doc.data().checkOut &&
            new Date(doc.data().checkOut?.seconds * 1000).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })
        }))
      );
    };
    getBookings();
  }, []);

  console.log(bookings);
  return (
    <Page title="Workspace Host | Bookings">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Bookings</Typography>
        </Stack>
        <Card>
          <Table
            rows={bookings.sort((a, b) => statuses.indexOf(a.status) - statuses.indexOf(b.status))}
            headings={ACTIVE_TABLE_HEADINGS}
          />
        </Card>
      </Container>
    </Page>
  );
};

export default WorkspaceBookings;
