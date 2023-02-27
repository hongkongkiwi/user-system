const schema = `
type Query {
    post(id: ID!): Post!
    posts: [Post]!
}
type Mutation {
    createPost(data: CreatePostInput!): Post!
}
type Post {
    id: ID!
    title: String!
    body: String!
    category: String!
    published: Boolean!
}
input CreatePostInput {
    id: ID
    title: String!
    body: String!
    category: String!
    published: Boolean!
}
`;
export default schema;