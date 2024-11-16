import { EmptyState, NoResults } from "./empty-states";

type Props = {
  page: number;
  query?: string | null;
  sort?: string[] | null;
  start?: string | null;
  end?: string | null;
  statuses?: string[] | null;
  customers?: string[] | null;
};

const pageSize = 25;

export async function InvoicesTable({
  query,
  sort,
  start,
  end,
  statuses,
  customers,
  page,
}: Props) {
  return <EmptyState />;
}
