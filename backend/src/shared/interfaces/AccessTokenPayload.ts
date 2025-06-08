import { JwtPayload } from 'jsonwebtoken'

export default interface AccessTokenPayload extends JwtPayload {
    id: string;
}
