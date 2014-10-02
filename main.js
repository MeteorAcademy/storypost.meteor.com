// Available to Client and Server
Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Meteor.methods({
        addPost: function(title, story, author, date) {
           Posts.insert({
            title: title,
            story: story,
            author: author,
            date: date
           }); 
        },
        deletePost: function(id) {
            Posts.remove(id);
        }
    });
}

if (Meteor.isClient) {
    Template.addPost.events({
        'submit form': function(event, template) {
            event.preventDefault();

            var post = {
                title: template.find('.title'),
                story: template.find('.story'),
                author: template.find('.author'),
                date: Date.create().full()
            };

            Meteor.call('addPost', post.title.value, post.story.value, post.author.value, post.date);

            post.title.value = '';
            post.story.value = '';
            post.author.value = '';
        }
    });

    Template.posts.events({
        'click .delete': function() {
            Meteor.call('deletePost', this._id);
        }
    });

    Template.posts.helpers({
        posts: function() {
            return Posts.find();
        }
    });
}
