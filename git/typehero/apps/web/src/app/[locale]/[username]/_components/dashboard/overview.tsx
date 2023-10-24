import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';

const challengesList = [
  {
    challengeTitle: 'Extreme Challenge 1',
    challengeStatus: 'In-Progress',
  },
  {
    challengeTitle: 'Easy Challenge 1',
    challengeStatus: 'Submitted',
  },
  {
    challengeTitle: 'Easy Challenge 2',
    challengeStatus: 'Submitted',
  },
  {
    challengeTitle: 'Easy Challenge 3',
    challengeStatus: 'Submitted',
  },
  {
    challengeTitle: 'Extreme Challenge 4',
    challengeStatus: 'In-Progress',
  },
];

export function Overview() {
  return (
    <Table>
      <TableCaption>A list of your recent challenges.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Challenge</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {challengesList.map((challengeTitle) => (
          <TableRow key={challengeTitle.challengeTitle}>
            <TableCell className="font-medium">{challengeTitle.challengeTitle}</TableCell>
            <TableCell>{challengeTitle.challengeStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
