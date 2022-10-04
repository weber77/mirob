
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum VoteStatus {
    UP = "UP",
    DOWN = "DOWN"
}

export enum ProfileRole {
    ADMIN = "ADMIN",
    SHARIAH = "SHARIAH",
    AUTHOR = "AUTHOR",
    USER = "USER"
}

export enum ProposalStatus {
    DRAFT = "DRAFT",
    IN_REVIEW = "IN_REVIEW",
    LIVE = "LIVE",
    ENDED = "ENDED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED"
}

export enum ThreadStatus {
    DRAFT = "DRAFT",
    IN_REVIEW = "IN_REVIEW",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    LIVE = "LIVE",
    RESOLVED = "RESOLVED"
}

export class CreateCategoryInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export class UpdateCategoryInput {
    id?: Nullable<UUID>;
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export class CreateCommentInput {
    content?: Nullable<string>;
    profile: UUID;
    proposal?: Nullable<string>;
    thread?: Nullable<string>;
}

export class UpdateCommentInput {
    id: UUID;
    content?: Nullable<string>;
    profile: UUID;
    proposal?: Nullable<string>;
    thread?: Nullable<string>;
}

export class VoteCommentInput {
    id: UUID;
    profile: UUID;
    status?: Nullable<VoteStatus>;
}

export class LoginProfileInput {
    walletAddress: string;
    signature: string;
    picture?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
}

export class UpdateProfileInput {
    id: string;
    walletAddress?: Nullable<string>;
    picture?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
}

export class UpdateProfileRoleInput {
    id: UUID;
    role: ProfileRole;
}

export class BookMarkCommentInput {
    id: UUID;
    comment: UUID;
}

export class CreateProposalInput {
    profile: UUID;
    title: string;
    description: string;
    attachments?: Nullable<Nullable<string>[]>;
    links?: Nullable<Nullable<string>[]>;
    discussion?: Nullable<string>;
    hashtags?: Nullable<Nullable<string>[]>;
    categories?: Nullable<Nullable<UUID>[]>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class UpdateProposalInput {
    id: UUID;
    profile: UUID;
    title?: Nullable<string>;
    description?: Nullable<string>;
    attachments?: Nullable<Nullable<string>[]>;
    links?: Nullable<Nullable<string>[]>;
    discussion?: Nullable<string>;
    hashtags?: Nullable<Nullable<string>[]>;
    categories?: Nullable<Nullable<UUID>[]>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class UpdateProposalStatusInput {
    id: UUID;
    status?: Nullable<ProposalStatus>;
}

export class CreateThreadInput {
    profile: UUID;
    title: string;
    description: string;
    categories?: Nullable<Nullable<UUID>[]>;
}

export class UpdateThreadInput {
    id: UUID;
    profile: UUID;
    title?: Nullable<string>;
    description?: Nullable<string>;
    categories?: Nullable<Nullable<UUID>[]>;
}

export class UpdateThreadStatusInput {
    id: UUID;
    status: ThreadStatus;
}

export class Bookmark {
    id?: Nullable<UUID>;
    profileId?: Nullable<UUID>;
    profile?: Nullable<Profile>;
    commentId?: Nullable<UUID>;
    comment?: Nullable<Comment>;
    createdDate?: Nullable<Date>;
    updatedDate?: Nullable<Date>;
}

export class Category {
    id?: Nullable<UUID>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class CategoriesResponse {
    total?: Nullable<number>;
    categories?: Nullable<Nullable<Category>[]>;
}

export abstract class IQuery {
    abstract categories(pageSize?: Nullable<number>, pageNum?: Nullable<number>): Nullable<CategoriesResponse> | Promise<Nullable<CategoriesResponse>>;

    abstract category(id: UUID): Nullable<Category> | Promise<Nullable<Category>>;

    abstract comments(profile?: Nullable<UUID>, proposal?: Nullable<UUID>, thread?: Nullable<UUID>, pageSize?: Nullable<number>, pageNum?: Nullable<number>): Nullable<CommentsResponse> | Promise<Nullable<CommentsResponse>>;

    abstract comment(id: UUID): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract profiles(search?: Nullable<string>, pageSize?: Nullable<number>, pageNum?: Nullable<number>): Nullable<ProfilesResponse> | Promise<Nullable<ProfilesResponse>>;

    abstract profile(walletAddress: string): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract proposals(status?: Nullable<ProposalStatus>, search?: Nullable<string>, pageSize?: Nullable<number>, pageNum?: Nullable<number>): Nullable<ProposalsResponse> | Promise<Nullable<ProposalsResponse>>;

    abstract proposal(id: UUID): Nullable<Proposal> | Promise<Nullable<Proposal>>;

    abstract threads(status?: Nullable<ThreadStatus>, search?: Nullable<string>, pageSize?: Nullable<number>, pageNum?: Nullable<number>): Nullable<ThreadsResponse> | Promise<Nullable<ThreadsResponse>>;

    abstract thread(id?: Nullable<UUID>): Nullable<Thread> | Promise<Nullable<Thread>>;
}

export abstract class IMutation {
    abstract createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;

    abstract removeCategory(id: UUID): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;

    abstract updateComment(updateCommentInput: UpdateCommentInput): Comment | Promise<Comment>;

    abstract removeComment(id: UUID): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract voteComment(voteCommentInput?: Nullable<VoteCommentInput>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract loginProfile(loginProfileInput: LoginProfileInput): LoginResponse | Promise<LoginResponse>;

    abstract updateProfile(updateProfileInput: UpdateProfileInput): Profile | Promise<Profile>;

    abstract updateProfileRole(updateProfileRoleInput?: Nullable<UpdateProfileRoleInput>): Profile | Promise<Profile>;

    abstract removeProfile(id: UUID): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract bookmarkComment(bookmarkCommentInput?: Nullable<BookMarkCommentInput>): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract unBookmarkComment(bookmarkCommentInput?: Nullable<BookMarkCommentInput>): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract createProposal(createProposalInput?: Nullable<CreateProposalInput>): Proposal | Promise<Proposal>;

    abstract updateProposal(updateProposalInput: UpdateProposalInput): Proposal | Promise<Proposal>;

    abstract updateProposalStatus(updateProposalStatusInput: UpdateProposalStatusInput): Proposal | Promise<Proposal>;

    abstract removeProposal(id: UUID): Nullable<Proposal> | Promise<Nullable<Proposal>>;

    abstract incrementProposalViews(id: UUID): Nullable<Proposal> | Promise<Nullable<Proposal>>;

    abstract createThread(createThreadInput: CreateThreadInput): Thread | Promise<Thread>;

    abstract updateThread(updateThreadInput: UpdateThreadInput): Thread | Promise<Thread>;

    abstract updateThreadStatus(updateThreadStatusInput: UpdateThreadStatusInput): Thread | Promise<Thread>;

    abstract removeThread(id: UUID): Nullable<Thread> | Promise<Nullable<Thread>>;

    abstract incrementThreadViews(id: UUID): Nullable<Thread> | Promise<Nullable<Thread>>;
}

export class Comment {
    id?: Nullable<UUID>;
    content?: Nullable<string>;
    profile?: Nullable<Profile>;
    proposal?: Nullable<string>;
    thread?: Nullable<string>;
    votes?: Nullable<number>;
    voted?: Nullable<Nullable<Vote>[]>;
    bookmarks?: Nullable<Nullable<Bookmark>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class CommentsResponse {
    total?: Nullable<number>;
    comments?: Nullable<Nullable<Comment>[]>;
}

export class Profile {
    id?: Nullable<UUID>;
    nonce?: Nullable<string>;
    walletAddress?: Nullable<string>;
    role?: Nullable<ProfileRole>;
    picture?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
    bookmarks?: Nullable<Nullable<Bookmark>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class LoginResponse {
    jwtToken?: Nullable<string>;
}

export class ProfilesResponse {
    total: number;
    profiles: Nullable<Profile>[];
}

export class Proposal {
    id?: Nullable<UUID>;
    profile?: Nullable<Profile>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<ProposalStatus>;
    attachments?: Nullable<Nullable<string>[]>;
    links?: Nullable<Nullable<string>[]>;
    discussion?: Nullable<string>;
    hashtags?: Nullable<Nullable<string>[]>;
    categories?: Nullable<Nullable<Category>[]>;
    views?: Nullable<number>;
    startDate?: Nullable<Date>;
    endDate?: Nullable<Date>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class ProposalsResponse {
    total: number;
    proposals: Nullable<Proposal>[];
}

export class Thread {
    id?: Nullable<UUID>;
    profile?: Nullable<Profile>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<ThreadStatus>;
    categories?: Nullable<Nullable<Category>[]>;
    views?: Nullable<number>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class ThreadsResponse {
    total: number;
    threads: Nullable<Thread>[];
}

export class Vote {
    id?: Nullable<UUID>;
    profileId?: Nullable<UUID>;
    profile?: Nullable<Profile>;
    commentId?: Nullable<UUID>;
    comment?: Nullable<Comment>;
    status?: Nullable<VoteStatus>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export type UUID = any;
type Nullable<T> = T | null;
