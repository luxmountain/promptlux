import { GET as getAllUsers } from "./getAll";
import { POST as createUser } from "./create";
import { GET as getUserUid } from "./[email]/route";

export { getAllUsers as GET, createUser as POST, getUserUid };