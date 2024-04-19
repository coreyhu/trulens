import { Stack, SxProps, Theme, Typography } from '@mui/material';
import { RecordJSONRaw } from '../../utils/types';
import LabelAndValue from '../../LabelAndValue/LabelAndValue';
import TracePanel from './TracePanel';
import { StackTreeNode } from '../../utils/StackTreeNode';

type RootDetailsProps = {
  root: StackTreeNode;
  recordJSON: RecordJSONRaw;
};

export default function RootDetails({ root, recordJSON }: RootDetailsProps) {
  const { timeTaken: nodeTime } = root;

  return (
    <>
      <Stack direction="row" sx={rootDetailsContainerSx}>
        <LabelAndValue label="Latency" value={<Typography>{nodeTime} ms</Typography>} />
      </Stack>

      <TracePanel recordJSON={recordJSON} />
    </>
  );
}

const rootDetailsContainerSx: SxProps<Theme> = {
  border: ({ palette }) => `1px solid ${palette.grey[300]}`,
  pl: 2,
  py: 1,
  borderRadius: 0.5,
  width: 'fit-content',
};
