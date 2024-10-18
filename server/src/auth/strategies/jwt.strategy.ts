import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractJwtCookie,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	}

	private static extractJwtCookie(req: RequestType) {
		if (
			req.cookies &&
			'user_token' in req.cookies &&
			req.cookies.user_token.length > 0
		) {
			return req.cookies.user_token;
		}

		return null;
	}
}
