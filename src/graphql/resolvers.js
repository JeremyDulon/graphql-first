/**
 * Created by jerem on 3/2/2018.
 */

const { getResourceByPath } = require('./api')

const resolvers = {
    Query: {
        hello: (_, { name }) => {
            const returnValue = name ? `Hello ${name || 'World!'}` : null
            return returnValue
        },

        users: async (_) => {
            users =  await getResourceByPath('/users')
            todos = await getResourceByPath('/todos')
            photos = await getResourceByPath('/photos')
            albums = await getResourceByPath('/albums')
            comments = await getResourceByPath('/comments')
            posts = await getResourceByPath('/posts')

            users.map( (user) =>
            {
                user.todos = putResourcesInObject(user, 'user', todos);
                user.albums = putResourcesInObject(user, 'user', albums, 'album', photos, 'photos');
                user.posts = putResourcesInObject(user, 'user', posts, 'post', comments, 'comments');
            });
            return users
        },
        user: async (_, {userId }) => {
            user =  await getResourceByPath('/users', userId)
            todos = await getResourceByPath('/todos')
            photos = await getResourceByPath('/photos')
            albums = await getResourceByPath('/albums')
            comments = await getResourceByPath('/comments')
            posts = await getResourceByPath('/posts')

            user.todos = putResourcesInObject(user, 'user', todos);
            user.albums = putResourcesInObject(user, 'user', albums, 'album', photos, 'photos');
            user.posts = putResourcesInObject(user, 'user', posts, 'post', comments, 'comments');

            return user
        },
        todos: async (_, { id }) => {
            return await getResourceByPath('/todos')
        },
        albums: async (_, { id }) => {
            albums = await getResourceByPath('/albums')
            photos = await getResourceByPath('/photos')

            albums.map( (album) => {
              album.photos = putResourcesInObject(album, 'album', photos);
            });
            return albums
        },
        album: async (_, { albumId }) => {
            album = await getResourceByPath('/albums',albumId)
            photos = await getResourceByPath('/photos')

            album.photos = putResourcesInObject(album, 'album', photos);

            return album
        },
        photos: async (_, { id }) => {
            return await getResourceByPath('/photos')
        },
        posts: async (_, { id }) => {
            comments = getResourceByPath('/comments')
            posts = getResourceByPath('/posts')

            posts.map( (post) => {
                post.comments = putResourcesInObject(post, 'post', comments);
            });
            return posts
        },
        post: async (_, { postId }) => {
            comments = getResourceByPath('/comments')
            post = getResourceByPath('/posts',postId)

            post.comments = putResourcesInObject(post, 'post', comments);
            return post
        },
        comments: async (_, { id }) => {
            return await getResourceByPath('/comments')
        },
    },
}

function putResourcesInObject(object, objectName, resources, resourceName = '', childResources = null, childResourceName = '') {
    let resourcesArray = [];
    resources.forEach(function(resource) {
        if(resource[objectName + 'Id'] === object.id) {
            if(childResources) {
                let childResourcesArray = [];
                childResources.forEach(function (childResource) {
                    if (childResource[resourceName + 'Id'] === resource.id) {
                        childResourcesArray.push(childResource)
                    }
                }, this);
                resource[childResourceName] = childResourcesArray;
            }
            resourcesArray.push(resource)
        }
    }, this);
    return resourcesArray;
}

module.exports = {
    resolvers
}