import { Avatar, Badge, Table, Group, Text, Select } from '@mantine/core';

export function AllClubsTable({data}) {
  if(data?.length === 0 )return(
    <Text fz="sm" fw={500}>
      Go Follow some clubs
    </Text>
  )
  const rows = data?.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
            <Text fz="sm" fw={500}>
              {item}
            </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Clubs</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}