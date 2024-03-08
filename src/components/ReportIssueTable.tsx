import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";


export default function ReportIssueTable() {
    let issues = [
        {
            id: '1',
            issueType: 'Agency Issue',
            message: 'Hi, I am having issues with my agency. I am unable to create a tour. Please help me resolve this issue. Thanks.',
            status: 'Pending'
        },
        {
            id: '2',
            issueType: 'Tour Issue',
            message: 'Hi, I am having issues with my tour. I am unable to create a tour. Please help me resolve this issue. Thanks.',
            status: 'Resolved'
        },
        {
            id: '3',
            issueType: 'Payment Issue',
            message: 'Hi, I am having issues with my payment. I am unable to create a tour. Please help me resolve this issue. Thanks. Look forward to your response. Thanks. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus euismod, fermentum nunc nec, lacinia nunc',
            status: 'In Progress'
        },
        {
            id: '4',
            issueType: 'Agency Issue',
            message: 'Hi, I am having issues with my agency. I am unable to create a tour. Please help me resolve this issue. Thanks.',
            status: 'Pending'
        },
        {
            id: '5',
            issueType: 'Tour Issue',
            message: 'Hi, I am having issues with my tour. I am unable to create a tour. Please help me resolve this issue. Thanks.',
            status: 'Cancelled'
        },
        {
            id: '6',
            issueType: 'Payment Issue',
            message: 'Hi, I am having issues with my payment. I am unable to create a tour. Please help me resolve this issue. Thanks.',
            status: 'In Progress'
        }
    ];
    return (
        <div>
            <Table className="">
                <TableCaption>A list of your recent reported issues</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Issue ID</TableHead>
                        <TableHead>Issue Type</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {issues.map((issue) => (
                        <TableRow key={issue.id}>
                            <TableCell className="w-[50px]">{issue.id}</TableCell>
                            <TableCell className="w-[150px]">{issue.issueType}</TableCell>
                            <TableCell className="">
                                <p className="line-clamp-1">
                                    {issue.message}
                                </p>
                            </TableCell>
                            <TableCell className="w-[200px] flex gap-1 items-center">
                                {issue.status === 'Pending' &&
                                    <svg className="fill-gray-400" xmlns="http://www.w3.org/2000/svg" height="18"
                                         viewBox="0 -960 960 960" width="24">
                                        <path
                                            d="M280-420q25 0 42.5-17.5T340-480q0-25-17.5-42.5T280-540q-25 0-42.5 17.5T220-480q0 25 17.5 42.5T280-420Zm200 0q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm200 0q25 0 42.5-17.5T740-480q0-25-17.5-42.5T680-540q-25 0-42.5 17.5T620-480q0 25 17.5 42.5T680-420ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                    </svg>}
                                {issue.status === 'In Progress' &&
                                    <svg className="fill-gray-400" xmlns="http://www.w3.org/2000/svg" height="18"
                                         viewBox="0 -960 960 960" width="24">
                                        <path
                                            d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/>
                                    </svg>}
                                {issue.status === 'Resolved' &&
                                    <svg className="fill-gray-400" xmlns="http://www.w3.org/2000/svg" height="18"
                                         viewBox="0 -960 960 960" width="24">
                                        <path
                                            d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                    </svg>}
                                {issue.status === 'Cancelled' && <svg className="fill-gray-400" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="24"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>}

                                <span className>{issue.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}