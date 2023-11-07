// create user & post api project using http server & express
// using http
const users = [
    {
        id:1,
        name:"mahmoud",
        email:"mahmoudalbanhawi863@gmail.com"
    },
    {
        id:2,
        name:"youssef",
        email:"youssef@gmail.com"
    }
]

const posts = [
    {
        id:1,
        title:"iphone 13 pro max",
        description:"good"
    },
    {
        id:2,
        title:"iphone x ",
        description:"good"
    }
]

// users end points
const http = require('http')
http.createServer((req,res)=>{
const {url , method } = req;
// 1- get all users
if(url == '/' && method == 'GET'){
    res.write(JSON.stringify(users))
    res.end()
}
// 2- Add users
else if(url == '/' && method == 'POST'){
    let data;
    req.on('data',(chunk)=>{
        data = chunk;
    })
    req.on('end',()=>{
        const parsedData = JSON.parse(data)
        const usercheck = users.find((usr)=>{
            return usr.email == parsedData.email
        })
        if(usercheck){
            res.write('email is already exist')
            res.end()
        }
        else {
            users.push(parsedData)
            res.write(JSON.stringify(users))
            res.end()
        }
    })
}
// 3- Get all Posts reversed
else if(url == '/sorted' && method == 'GET'){
    users.sort((a,b)=>{
        return a.name.localeCompare(b.name.localeCompare)
    })
    res.write(JSON.stringify(users))
    res.end()
}
// 4- delete user 
else if(url == '/' && method == 'DELETE'){
    let data;
    req.on('data',(chunk)=>{
        data = chunk
    })
    req.on('end',()=>{
        const parsedData = JSON.parse(data)
        const usercheck = users.findIndex((usr)=>{
            return usr.email == parsedData.email;
        })
        if(usercheck != -1){
            const deleteuser = users.splice(usercheck ,1)
            res.write(JSON.stringify(deleteuser))
            res.end()
        }
        else {
            res.write('user not found')
            res.end()
        }

    })
}
// 5- update user 
else if (url == '/' && method == 'PUT')
{
    let data;
    req.on('data',(chunk)=>{
        data = chunk
    })
    req.on('end',()=>{
        const parsedData = JSON.parse(data)
        const usercheck = users.findIndex((usr)=>{
            return usr.email == parsedData.email
        })
        if(usercheck != -1){
           users[usercheck] = parsedData;
           res.write(JSON.stringify(users))
           res.end()
        }
        else {
            res.write("user not found")
            res.end()
        }
    })
}
// 6- search user by id
else if(url == '/id' && method == 'POST'){
    let data;
    req.on('data',(chunk)=>{
        data = chunk
    })
    req.on('end',()=>{
        const parsedData = JSON.parse(data)
        const usercheck = users.find((usr)=>{
            return usr.id == parsedData.id
        })
        if(usercheck){
            res.write(JSON.stringify(usercheck))
            res.end()
        }
        else {
            res.write("user not found")
            res.end()
        }
    })

}

}).listen(3000,()=>{
    console.log('server is running')
})

// post end point 

http.createServer((req,res)=>{
    const {url , method } = req
    // 1- get all posts
    if(url == '/' && method == 'GET'){
        res.write(JSON.stringify(posts))
        res.end()
    }
    // 2- add posts
    else if(url == '/' && method == 'POST'){
        let data;
        req.on('data',(chunk)=>{
            data = chunk
        })
        req.on('end',()=>{
            const parsedData = JSON.parse(data)
            const postcheck = posts.find((prod)=>{
                return prod.id == parsedData.id
            })
            if(postcheck){
                res.write("post is already exist")
                res.end()
            }
            else {
                posts.push(parsedData)
                res.write(JSON.stringify(posts))
                res.end()
            }
        })
    }
    // 3- get all posts reversed
    else if(url == '/reversed' && method == 'GET'){
        posts.reverse()
        res.write(JSON.stringify(posts))
    }
    // 4- delete post
    else if(url == '/' && method == 'DELETE'){
        let data;
        req.on('data',(chunk)=>{
            data = chunk
        })
        req.on('end',()=>{
            const parsedData = JSON.parse(data)
            const postcheck = posts.findIndex((prod)=>{
                return prod.id == parsedData.id
            })
            if(postcheck != -1){
                const deletepost = posts.splice(postcheck , 1)
                res.write(JSON.stringify(deletepost))
                res.end()
            }
            else {
                res.write("post not found")
                res.end()
            }
        })
    }
    // 5- update post 
    else if(url == '/' && method == 'PUT'){
        let data;
        req.on('data',(chunk)=>{
            data = chunk
        })
        req.on('end',()=>{
            const parsedData = JSON.parse(data)
            const postcheck = posts.findIndex((prod)=>{
                return prod.id == parsedData.id
            })
            if(postcheck != -1){
                posts[postcheck] = parsedData
                res.write(JSON.stringify(posts))
                res.end()
            }
            else {
                res.write("post not found")
                res.end()
            }
        })
    }
    // 6- search post by id
    else if(url == '/id' && method == 'POST'){
        let data;
        req.on('data',(chunk)=>{
            data = chunk
        })
        req.on('end',()=>{
            const parsedData = JSON.parse(data)
            const postcheck = posts.find((prod)=>{
                return prod.id == parsedData.id
            })
            if(postcheck){
               res.write(JSON.stringify(postcheck))
               res.end()
            }
            else {
               res.write('post not found')
               res.end()
            }
        })
    }
    else {
        res.write('post not found')
        res.end()
    }
}).listen(5000,()=>{
    console.log('server is running')
})
// ====================================================================================== //

// using express
// users end point

const express = require('express')
const app = express()
// 1- get all users
app.get('/',(req,res,next)=>{
    res.json({message :"done",users})
})
// 2- add users
app.use(express.json())
app.post('/',(req,res,next)=>{
    const {email} = req.body;
    const usercheck = users.find((usr)=>{
        return usr.email == email;
    })
    if(usercheck){
        res.json({message:"email is already exist"})
    }
    else {
        users.push(req.body)
        res.json({message:"done",users})
    }
})
// 3- Get all users sorted alphabetically by name
app.get('/sorted',(req,res,next)=>{
    users.sort((a,b)=>{return a.name.localeCompare(b.name.localeCompare)})
    res.json({message:"done",users})
})
// 4- delete user 
app.delete('/',(req,res,next)=>{
    const {email} = req.body;
    const usercheck = users.findIndex((usr)=>{
        return usr.email == email
    })
    if(usercheck != -1){
        const deleteuser = users.splice(usercheck , 1)
        res.json({message:"done",users})
    }
    else {
        res.json({message:"user not found"})
    }

})
// 5- updaye user
app.put('/',(req,res,next)=>{
    const {email} = req.body;
    const usercheck = users.findIndex((usr)=>{
        return usr.email == email
    })
    if(usercheck != -1){
        users[usercheck] = req.body;
        res.json({message:"done",users})
    }
    else {
        res.json({message:"user not found"})
    }

})

// 6- search by id
app.post('/search',(req,res,next)=>{
    const {id} = req.body
    const usercheck = users.findIndex((usr)=>{return usr.id == id})
    if(usercheck){
        res.json({message:"done",usercheck})
    }
    else {
        res.json({message:"user not found"})
    }
})

app.listen(3500,()=>{
    console
})

// posts end point

// post end points 
// 1- get  all posts
app.get('/post',(req,res,next)=>{
    res.json({message:"done",posts})
})
// 2- add posts
app.post('/post',(req,res,next)=>{
    post.push(req.body)
    res.json({message:"done",posts})
})
// 3- Get all Posts reversed
app.get('/postreserved',(req,res,next)=>{
    posts.reverse()
    res.json({message:"done",posts})
})
// 4- delete post
app.delete('/post',(req,res,next)=>{
    const {id} = req.body;
    const postcheck  = posts.findIndex((prod)=>{
        return prod.id == id
    })
    if(postcheck != -1){
        const deleteprod = posts.splice(postcheck , 1)
        res.json({message:"done",deleteprod})
    }
    else {
        res.json({message:"post not found"})
    }

})
// 5- update post
app.put('/post',(req,res,next)=>{
    const {id} = req.body;
    const postcheck  = posts.findIndex((prod)=>{
        return prod.id == id
    })
    if(postcheck != -1){
        post[postcheck] = req.body
        res.json({message:"done",posts})
    }
    else {
        res.json({message:"post not found"})
    }
})
// 6- search  post by id
app.post('/postid',(req,res,next)=>{
    const {id} = req.body;
    const postcheck = posts.find((prod)=>{
        return prod.id == id
    })
    if(postcheck){
        res.json({message:"done",postcheck})
    }
    else {
        res.json({message:"post not found"})
    }
})
app.listen(5500,()=>{
    console.log('server is running')
})