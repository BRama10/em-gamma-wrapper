import React, {useState, useEffect} from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface User {
    key: string;
    title: string;
    type: string;
    status: string;
}

interface DataTableProps {
    users: User[];
}

export function DataTable({ users }: DataTableProps) {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;

    const router = useRouter();

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    const [key, setKey] = useState<any>(['']);

    useEffect(() => {
        if (parseInt(key.anchorKey) >= 0) {
        router.replace(`/workday/${key.anchorKey}`)
        }
    }, [key])

    return (
        <Table
            selectionMode="single"
            selectedKeys={key}
            onSelectionChange={(keys) => setKey(keys)}
            color='success'
            aria-label="Example table with client side pagination"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
        //   classNames={{
        //     wrapper: "min-h-[222px]",
        //   }}
        >
            <TableHeader>
                <TableColumn key="title">Title</TableColumn>
                <TableColumn key="type">Type</TableColumn>
                <TableColumn key="status">Status</TableColumn>
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
