import { useEffect, useState, useCallback } from 'react';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../utils/load-posts';
import './styles.css';

const Home =  () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(12);
  const [searchValue, setSearchValue] = useState('')

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])


  useEffect (() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const lastPost = nextPage + postsPerPage;

    const nextPosts =  allPosts.slice(nextPage, lastPost)

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const  { value } = e.target;
    setSearchValue(value);
  }


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
            eventChange={ handleChange }
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
              eventClick={ loadMorePosts }
              disabled={noMorePosts}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
