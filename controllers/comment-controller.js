const { Comment, Pizza } = require('../models');

const commentController = {
    //Add Comment
    addComment({params, body},res) {
        console.log(body);
        Comment.create(body)
        .then(({_id}) => {
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId},
                { $push: {comments:_id } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'Not found'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    //AddReply
    addReply({params, body}, res) {
        Comment.findOneAndUpdate(
            {_id: params.commentId},
            { $push: {replies: body}},
            {new:true}
        )
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'Not found'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    //Remove Comment
    removeComment({params}, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({ message: 'No comment found' });
            }
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId },
                {$pull: {comments: params.commentId}},
                {new:true}
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'Not found'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => console.log('ERROR'));
    },

    //Remove Reply
    removeReply({params}, res) {
        Comment.findOneAndUpdate(
            {_id: params.commentId},
            //Remove a reply where replyID = params.replyID
            {$pull: {replies: {replyId: params.replyId}}},
            {new:true}
        )
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.json(err));
    }
};

module.exports = commentController;