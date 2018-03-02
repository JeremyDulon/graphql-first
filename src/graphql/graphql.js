const typeDefs = `
   type Query {
       hello(name: String): String
       users: [User]
       user(userId: ID): User
       albums :[Album]
       album(albumId: ID): Album!
       photos : [Photo]
       posts : [Post]
       post(postId: ID) : [Post]
       comments : [Comment]
       todos: [Todo]
   }
   
 type User {
      id: ID!
      name: String!
      username : String!
      email : String!
      address : Address!
      phone : String!
      website : String!
      company : Company!
      posts : [Post]
      albums : [Album]
      todos : [Todo]
  }

  type Address {
      street : String!
      suite : String!
      zipcode : String!
      geo : Geo!
  }

  type Geo {
      lat : String!
      lng : String!
  }

  type Company {
      name : String!
      catchPhrase : String!
      bs : String!
  }
 
  type Album {
      userId : ID!
      id : ID!
      title : String!
      photos : [Photo]
  }

  type Post {
      userId : ID!
      id : ID!
      title : String!
      body : String!
      comments : [Comment]
  }

  type Todo {
   userId : ID!
   id : ID!
   title : String!
   completed : Boolean!
  }

  type Photo {
   albumId : ID!
   id:ID!
   title: String!
   url : String!
   thumbnailUrl : String!

  }

  type Comment{
      postId : ID!
      id:ID!
      name :String!
      email : String!
      body : String !

  }
 
  `

  module.exports = typeDefs
