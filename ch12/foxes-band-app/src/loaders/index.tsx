// 다른 모듈에서 사용할것이라 미리 Export 해준다.

import axios, { AxiosResponse } from "axios";
import { defer } from "react-router";

export type SongType = { id: number; title: string; musician: string; youtube_link: string };
export type MemberType = { id: number; name: string; photo: string };

export const membersLoader = async () => {
  const promiseMembers: Promise<MemberType[]> = axios
    .get<MemberType[], AxiosResponse<MemberType[]>>("/members_long")
    .then((response) => response.data);
  return defer({ members: promiseMembers });
};
export const songListLoader = async () => {
  const promiseSongs: Promise<SongType[]> = axios
    .get<SongType[], AxiosResponse<SongType[]>>("/songs_long")
    .then((response) => response.data);
  return defer({ songs: promiseSongs });
};
type ParamsType = { params: Partial<{ id: number }> };
export const playerLoader = async ({ params }: ParamsType) => {
  const promiseSong: Promise<SongType> = axios
    .get<SongType[], AxiosResponse<SongType>>(`/songs/${params.id}`)
    .then((response) => response.data);
  return defer({ song: promiseSong });
};
