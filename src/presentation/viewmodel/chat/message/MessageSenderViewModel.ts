export default interface MessageSenderViewModel {
  id: string;
  fullName: string;
  email: string;
  chatMemberType: "USER" | "CUSTOMER";
}