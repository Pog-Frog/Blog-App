import withAuth from "@/components/withAuth";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {showError} from "@/redux/reducers/error.reducer";
import {Post} from "@/pages/api/interfaces/post.interface";
import {PostService} from "@/pages/api/services/post.service";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button, TextField, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {showSuccess} from "@/redux/reducers/success.reducer";


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Home = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([] as Post[])

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        PostService.getPosts()
            .then((res) => {
                    res.data.forEach((post: Post) => {
                        // @ts-ignore
                        post.createdAt = new Date(post.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })
                        post.liked = false;
                    })
                    setPosts(res.data);
                    setLoading(false);
                }
            ).catch((err) => {
            dispatch(showError(err.message));
        })
    }, [])


    const likePost = (id: string, likes: number) => {
        PostService.updatePostLikes(id, likes + 1)
            .then((res) => {
                setPosts(posts.map((post) => {
                    if (post._id === id) {
                        return {...post, likes: likes + 1, liked: true};
                    } else {
                        return post;
                    }
                }));
            }).catch((err) => {
            dispatch(showError(err.message));
        })
    }

    return (
        <>
            {loading ? <div>Loading...</div> :
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <CreatePostForm/>
                    {
                        posts.length === 0 ?
                            <Card sx={{width: 800, height: 500}}>
                                <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="h5" component="div">
                                        No posts yet
                                    </Typography>
                                </CardContent>
                            </Card>
                            :
                            posts.map((post) => (
                                <Card key={post._id} sx={{width: 800}}>
                                    <Card sx={{padding: 2}}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                                    R
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon/>
                                                </IconButton>
                                            }
                                            title={post.author.firstname + ' ' + post.author.lastname}
                                            subheader={`${post.createdAt}`}
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image="paella.jpg"
                                            alt="Paella dish"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {post.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites"
                                                        onClick={() => likePost(post._id, post.likes)}
                                                        disabled={post.liked}>
                                                <FavoriteIcon/>
                                                <Typography variant="body1" color="text.secondary" paddingLeft={1}>
                                                    {post.likes}
                                                </Typography>
                                            </IconButton>
                                            <ExpandMore
                                                expand={expanded}
                                                onClick={handleExpandClick}
                                                aria-expanded={expanded}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon/>
                                            </ExpandMore>
                                        </CardActions>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph>Method:</Typography>
                                                <Typography paragraph>
                                                    {post.content}
                                                </Typography>
                                            </CardContent>
                                        </Collapse>
                                    </Card>
                                </Card>
                            ))
                    }
                </Box>
            }
        </>
    )
}

export default withAuth(Home);


const CreatePostForm = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // @ts-ignore
        const post: Post = {
            title: data.get('title') as string,
            content: data.get('content') as string,
        }
        console.log(post);
        PostService.createPost(post)
            .then((res) => {
                    dispatch(showSuccess("Post created successfully"));
                    window.location.reload();
                }
            ).catch((err) => {
            dispatch(showError(err.message));
        })
    };

    return (
        <Box>
            <Button variant="contained" onClick={() => setOpen(!open)}>Create Post</Button>
            <Box display={open ? "block" : "none"}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="title"
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={4}
                        required
                        name="content"
                    />
                    <Box marginTop={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Create
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};
