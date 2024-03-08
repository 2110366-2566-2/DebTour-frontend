import {DialogContent} from "@/components/ui/dialog";

export default function ReportIssueDetailDisplay({issueId}: { issueId: string }) {
    return (
        <DialogContent className="max-w-[840px] max-h-[840px] overflow-y-auto">
            <div className="flex gap-2">
                <h1 className="font-bold">Issue ID</h1>
                <p>{issueId}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Issue Type</h1>
                <p>Agency Issue</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Status</h1>
                <p>Pending</p>
            </div>
            <div className="">
                <h1 className="font-bold">Message</h1>
                <p>Hi, I am having issues with my agency. I am unable to create a tour. Please help me resolve this issue. Thanks.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus euismod, fermentum nunc nec, lacinia nunc
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.
                    Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.
                    Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
                    massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in,
                    nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </p>
            </div>
            <div className="flex justify-center">
                {/*image as base64*/}
                {/*<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAOUlEQVRIDbXBAQEAAAABIP6PZkpK" />*/}
                <img src="https://via.placeholder.com/500" alt="image"/>
            </div>
        </DialogContent>
    );
}