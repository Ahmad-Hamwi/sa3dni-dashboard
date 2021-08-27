import MessageSenderViewModel from "../../MessageSenderViewModel";

export default interface ChatClosedViewModel {
  closedBy: MessageSenderViewModel;
  createdAt: string;
}