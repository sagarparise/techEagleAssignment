const Text = require("../models/textModel");
const Todo = require("../models/todoModel");

const addTodo = async(req, res) =>{
const {text} = req.body;
const currentUser = req.user;

if(!text){
  return res.status(400).json({
    status:400,
   message: "Text is required",
  })
}

try {
 let todoUser = await Todo.findOne({userId: currentUser.id})
 
  if(!todoUser){
   todoUser = new Todo({
      userId: currentUser.id,
      todos: []
    })   
  }

  const newText = new Text({
    text
  })
 

  //todoUser.todos.push({text});
  todoUser.todos.push(newText._id);
 // await todoUser.save();

 await Promise.all([newText.save(), todoUser.save()])
  res.status(201).json({
    status:201,
   message: "Todo added successfully",
   todo: newText,
  })
  
} catch (error) {
  
  res.status(500).json({
    status:500,
   message: "Internal Server Error",
  })
}

}

const getTodo = async(req, res)=>{
  const currentUser = req.user;

    try {
      const todos = await Todo.findOne({userId: currentUser.id}).populate('todos')

      console.log(todos.todos)

      res.status(200).json({
        status:200,
       message: "Todos fetched successfully",
       todos: todos.todos,
      })

    } catch (error) {
      
      res.status(500).json({
        status:500,
       message: "Internal Server Error",
      })
    }

}

const deleteTodo = async(req, res)=>{
  console.log('deleteTodo')
   const {id} = req.params;

  const currentUser = req.user;

  try {
    const todoUser = await Todo.findOne({userId: currentUser.id})

    if (!todoUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }


    const todoIndex = todoUser.todos.findIndex(todo => todo.toString() === id);

    console.log('deleted todos id :',todoIndex, id)

    if (todoIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found",
      });
    }
    todoUser.todos.splice(todoIndex, 1);

   const textDel =  await Text.findByIdAndDelete(id)

   if (!textDel) {
    return res.status(404).json({
      status: 404,
      message: "Text not found",
    });
  }
  
  await todoUser.save()



    res.status(200).json({
      status:200,
     message: "Todo deleted successfully",

    })
  }
  catch(error){
    res.status(500).json({
      status:500,
     message: "Internal Server Error",
    })
  }
}

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const currentUser = req.user;

  try {
    const todoUser = await Todo.findOne({ userId: currentUser.id });

    if (!todoUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const todoIndex = todoUser.todos.findIndex(todo => todo.toString() === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found",
      });
    }

    // Find the Text document by id and update it
    const updatedText = await Text.findByIdAndUpdate(
      id,
      { text },
    );

    if (!updatedText) {
      return res.status(404).json({
        status: 404,
        message: "Text not found",
      });
    }

    await todoUser.save();

    res.status(200).json({
      status: 200,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {addTodo, getTodo, deleteTodo, updateTodo}