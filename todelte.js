const templates = []
const statusOptions = ["inprogress", "pending", "submitted", "completed"];
const logsOptions =["signIn","SignOut", ...statusOptions,"request","sign UP"]
const boolOption =["True", "False"]
for (let i =1; i<6; i++) {
   let template = {
        "templateId": i ,
        "templateTitle": `Template ${i}`,
        "questionSections": {
            "Quality focus": [{"questionId": 1, "questionType": "select one"},
                              {"questionId": 2, "questionType": "enter text"}],
            "People skills": [{"questionId": 3, "questionType": "select one"},
                              {"questionId": 4, "questionType": "enter text"}],
            "Self guidance": [{"questionId": 5, "questionType": "select one"},
                               {"questionId": 6, "questionType": "enter text"}],
            "Leadership": [{"questionId": 7, "questionType": "select one"},
                           {"questionId": 8, "questionType": "enter text"}]
        },
        "templateStatus": boolOption[Math.floor(Math.random() * boolOption.length)]
    }
    templates.push(template);
}

let users = []
for  (let i =1; i<6; i++) {
    let user = {
        "userId": i,
        "preferredName": `User ${i}`,
        "email": `user${i}@example.com`,
        "fullName": `Full Name ${i}`,
        "password": `password${Math.floor(Math.random() * 10000000)}`,
        "contact": Math.floor(Math.random() * 10000000),
        "imageUrl": `Image URL ${i}`
    }
    users = [...users,user]
}


const roles = []
for  (let i =1; i<6; i++) {
   let role = {
        "roleId": i,
        "roleName": `Role ${i}`,
        "status": boolOption[Math.floor(Math.random() * boolOption.length)],
        "level": i
    }
    roles.push(role)
}

let user_role_mappings = []
for  (let i =1; i<6; i++) {
  let   user_role_mapping = {
        "userId": i,
        "roleId": Math.floor(Math.random() * (4 - 1 + 1)) + 1, 
        "mappedBy": i,
        "createdOn": Date()
    }
    user_role_mappings = [...user_role_mappings, user_role_mapping]
}



const projects = []
for  (let i =1; i<6; i++) {
  let  project = {
        "projectId": i,
        "name": `Project ${i}`,
        "status": statusOptions[Math.floor(Math.random() * statusOptions.length)],
        "members": [1, 2],
    }
    projects.push(project)
}

const feedbackRequestAndResponses=[]
for  (let i =1; i<6; i++) {
let feedbackRequestAndResponse =
    {
      "requestId": i,
      "userId":  Math.floor(Math.random() * (4 - 1 + 1)) + 1, 
      "templateId": Math.floor(Math.random() * (4 - 1 + 1)) + 1,
      "reviewee": Math.floor(Math.random() * (4 - 1 + 1)) + 1,
      "createdBy": Math.floor(Math.random() * (4 - 1 + 1)) + 1,
      "createdOn": Date(),
      "responseByDate": Date(),
      "progress": statusOptions[Math.floor(Math.random() * statusOptions.length)],
      "responseDateLog": [Date.now(),Date.now(),Date.now()],
      "questionSections": [
        {
          "QualityFocus": [
            {
              "questionId": Math.floor(Math.random() * (7 - 1 + 1)) + 1,
              "responseAnswer": `Excellent i rate it ${Math.floor(Math.random() * (7 - 1 + 3)) + i}`
            },
            {
              "questionId": Math.floor(Math.random() * (10 - 1 + 1)) + 1,
              "responseAnswer": `Needs improvement ${Math.ceil(Math.random() * (7 - 1 + 3)) + i}`
            }
          ]
        },
        {
          "Leadership": [
            {
              "questionId": Math.floor(Math.random() * (10 - 1 + 1)) + 1,
              "responseAnswer": true
            },
            {
              "questionId": Math.floor(Math.random() * (12 - 1 + 1)) + 1,
              "responseAnswer": "Good"
            }
          ]
        }
      ]
    }
    feedbackRequestAndResponses.push(feedbackRequestAndResponse);
}

let logs = []
for(let i =1; i<6; i++){
    let log =
        {
        "logid":i,
          "userId": Math.floor(Math.random() * (4 - 1 + 1)) + 1,
          "activity": logsOptions[Math.floor(Math.random() * logsOptions.length)],
          "date": "2022-10-01"
        }
        logs = [...logs, log]
}

console.log(user_role_mappings);