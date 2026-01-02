import Task from "../models/taskmodel.js";
import User from "../models/usermodel.js";

const taskCtl = {
    async addTaskPage(req, res) {
        try {
            const users = await User.find({});
            return res.render('./pages/AddTask.ejs',{ users });
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/AddTask.ejs',{ users: [] });
        }
    },
    async addTask(req, res) {
        try {
            await Task.create(req.body);
            return res.redirect('/viewTasks');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referer') || '/');
        }
    },
    async viewTasksPage(req, res) {
        try {
            const tasks = await Task.find({}).populate('assignTo');
            return res.render('./pages/ViewTasks.ejs',{ tasks });
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/ViewTasks.ejs',{ tasks: [] });
        }
    }
}

export default taskCtl;