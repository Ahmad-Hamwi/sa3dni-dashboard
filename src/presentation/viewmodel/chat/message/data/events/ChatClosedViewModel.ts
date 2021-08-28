import MessageSenderViewModel from "../../MessageSenderViewModel";

export default interface ChatClosedViewModel {
  chatId: string,
  closedBy: MessageSenderViewModel;
  createdAt: string;
}