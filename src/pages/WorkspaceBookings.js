import faker from 'faker';
import { sample } from 'lodash';
import { Card, Stack, Container, Typography } from '@mui/material';
import Table from '../components/Table';
import Page from '../components/Page';

import { mockImgAvatar } from '../utils/mockImages';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const minutes = ['00', 15, 30, 45];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const ampm = ['AM', 'PM'];
const statuses = ['Active', 'Upcoming', 'Checked Out'];

const randomLetter = () => sample(alphabet);

const activeRows = [...Array(10)]
  .map((_, index) => {
    const hour = sample(hours);
    const minute = sample(minutes);
    const day = sample(ampm);
    const randomCheckInTime = `${hour}:${minute}${day}`;
    const randomCheckOutTime = `${Math.min(hour + sample([1, 2, 3]), 12)}:${minute}${day}`;
    return {
      id: faker.datatype.uuid(),
      avatarUrl: mockImgAvatar(index + 1),
      name: faker.name.findName(),
      checkInTime: randomCheckInTime,
      checkOutTime: randomCheckOutTime,
      location: Math.floor(Math.random() * 100).toString() + randomLetter(),
      status: sample(statuses)
    };
  })
  .sort((a, b) => statuses.indexOf(a.status) - statuses.indexOf(b.status));

console.log(activeRows);
const ACTIVE_TABLE_HEADINGS = [
  { id: 'name', label: 'Guest Name', alignRight: false },
  { id: 'checkInTime', label: 'Check-In Time', alignRight: false },
  { id: 'checkOutTime', label: 'Checked Out', alignRight: false },
  { id: 'location', label: 'Table Location', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
];

// todo: add filter buttons

const WorkspaceBookings = () => (
  <Page title="User | Minimal-UI">
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Bookings</Typography>
      </Stack>
      <Card>
        <Table rows={activeRows} headings={ACTIVE_TABLE_HEADINGS} />
      </Card>
    </Container>
  </Page>
);

export default WorkspaceBookings;
