const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");

const app = express();

let message ="how are u vikas"

const schema = buildSchema(`

type post{
    UserId:Int,
    id:Int,
    title:String,
    body:String

}
 type get{
    postId: Int,
    id: Int,
    name:String,
    email:String,
    body:String
 }



  type user{
      name:String,
      age:Int,
      collage:String
  }

  type students{
      name:String,
      age:Int,
      rollNo:Int,
      Adress:String,
      phone:Int
  }

  type Query{
      hello:String,
      welcomeMessage(name:String,daysofWeek:String!):String,
      getUser:user,
      getallUser:[user],
      getPostFromExternalAPI:[post],
      getStudentInformation:[students],
      getAnotherApi:[get]
  }
  type mutation{
      setMessage(newMessage:String):String
  }

`);
const root = {
  hello: () => {
    return "hello graphql vikas";
  },
  welcomeMessage: (args) => {
    console.log(args);
    return `how u ${args.name}and day is ${args.daysofWeek}`;
  },
  getUser: () => {
    const user = {
      name: "vikas swain",
      age: 22,
      collage: "bbdit",
    };
    return user;
  },
  getallUser: () => {
    const users = [
      {
        name: "vikas swain",
        age: 22,
        collage: "bbdit",
      },
      {
        name: "aksh swain",
        age: 24,
        collage: "ccdit",
      },
    ];
    return users;
  },
  getPostFromExternalAPI: async () => {
    //   return axios
    //   .get('https://jsonplaceholder.typicode.com/posts')
    //   .then(res=>res.data)
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return result.data;
  },
  getStudentInformation:()=>{
      const students=[
          {
              name:"bik",
              age:33,
              rollNo:12,
              Adress:"sec-37 noida",
              phone:123456

          },
          {
            name:"cika",
            age:24,
            rollNo:22,
            Adress:"sec-37 delhi",
            phone:7654321

          }
      ]
      return students
  },
  getAnotherApi:async()=>{
  const res=await axios.get('https://jsonplaceholder.typicode.com/comments')
  return res.data
  },
  
  setMessage:({newMessage})=>{
      message=newMessage
      return message
  }
  
   

};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
