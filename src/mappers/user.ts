import { UserAccesToken } from './../interfaces/user';
import { User } from './../interfaces/user';

export const mapUserAccessToken = (user: User):UserAccesToken => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
})