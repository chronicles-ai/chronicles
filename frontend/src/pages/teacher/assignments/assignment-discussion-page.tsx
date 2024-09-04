import { Button } from '@/components/ui/button';
import { Chat } from '@/infrastructures/models/chat';
import moment from 'moment';

type ChatBubbleProps = {
  message: Chat;
};

const ChatBubble = ({ message: chat }: ChatBubbleProps) => {
  if (chat.user) {
    return (
      <div className="flex w-full flex-row justify-end">
        <div className="ml-24 text-right">
          <div className="rounded-t-2xl rounded-bl-2xl rounded-br-sm bg-gradient-to-br from-yellow-400 to-primary px-6 py-4">
            {chat.message}
          </div>
          <span className="mr-2 text-xs font-light">
            {moment.unix(chat.timestamp / 1000).format('HH:mm')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-row justify-start">
      <div className="mr-24 text-left">
        <div className="rounded-t-2xl rounded-bl-sm rounded-br-2xl border bg-slate-100 px-6 py-4">
          {chat.message}
        </div>
        <span className="ml-2 text-xs font-light">
          {moment.unix(chat.timestamp / 1000).format('HH:mm')}
        </span>
      </div>
    </div>
  );
};

export default function AssignmentDiscussionPage() {
  return (
    <div className="col-span-2 h-[75vh] rounded-lg border bg-gradient-to-br from-white to-slate-50">
      <div className="flex size-full flex-col justify-between">
        <div className="flex w-full flex-col-reverse gap-6 overflow-y-scroll px-6 py-4">
          <ChatBubble
            message={{
              message: 'Yes, go ahead',
              timestamp: 1630512000000,
              user: true,
            }}
          />

          <ChatBubble
            message={{
              message: 'Good morning sir, I want to complain about our story',
              timestamp: 1630512000000,
              user: false,
            }}
          />
        </div>

        <div>
          <form className="flex flex-row justify-between gap-4 px-6 pb-8 pt-3">
            <div className="flex grow items-center rounded-full border bg-slate-200/20">
              <input
                type="text"
                placeholder="Type your message here..."
                className="size-full rounded-l-full bg-transparent pl-6 outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              className="size-14 rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-[2px] size-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
