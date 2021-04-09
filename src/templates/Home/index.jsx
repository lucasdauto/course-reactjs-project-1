import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 20,
    searchValue: '',
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const lastPost = nextPage + postsPerPage;

    const nextPosts =  allPosts.slice(nextPage, lastPost)

    posts.push(...nextPosts);

    this.setState({ posts: posts, page: nextPage })
  }

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  render(){
    const { 
        posts, 
        page,
        postsPerPage, 
        allPosts, 
        searchValue 
      } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? 

    // FILTRA POSTS DE ACORDO COM O STATE QUE VEM DO INPUT DE SEARCH
    allPosts.filter(post => {
      return post.title.toLowerCase()
      .includes(searchValue.toLowerCase());
    }) : posts;
    
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1>Seach value: { searchValue }</h1>
            </>
          )}
          <TextInput 
              searchValue={ searchValue }
              eventChange={ this.handleChange }
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={ filteredPosts }/>
        )}

        {filteredPosts.length === 0 && (
          <>
            <p>Not exist Posts</p>
          </>
        )}
        {!searchValue && (
          <>
            <div className="button-container">
              <Button 
                text='Next Page'
                eventClick={ this.loadMorePosts }
                disabled={noMorePosts}
              />
            </div>
          </>
        )}
      </section>
    );
  }
}

export default Home;
