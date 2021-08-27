export default interface MessageSenderModel {
  id: string;
  fullName: string;
  email: string;
  chatMemberType: "USER" | "CUSTOMER";
}