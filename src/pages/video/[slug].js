import { gql, GraphQLClient } from 'graphql-request'
import styles from '../../styles/Video.module.scss'
import ReactPlayer from 'react-player/lazy'
import { IoArrowBack } from 'react-icons/io5'
import { FaBookmark } from 'react-icons/fa'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { useRouter } from 'next/router'

const changeToFavorite = async (slug) => {
  await fetch('/api/favoriteSeen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug }),
  })
}

const changeUnFavorite = async (slug) => {
  await fetch('/api/unFavoriteSeen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug }),
  })
}

function Video({ video }) {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ReactPlayer
          className={styles.player}
          controls
          playing
          muted
          url={video.mp4.url}
          width="100%"
          height="100%"
        />
      </div>

      <div className={styles.back} onClick={() => router.push('/')}>
        <IoArrowBack />
      </div>

      <div className={styles.tags}>
        <p>{video.tags.join(' - ')}</p>
      </div>

      <div className={styles.description}>
        <p>{video.description}</p>
      </div>

      <div className={styles.favorite}>
        <div
          className={styles.icon}
          onClick={() => changeToFavorite(video.slug)}
        >
          <AiFillLike />
        </div>
        <div
          className={styles.icon}
          onClick={() => changeUnFavorite(video.slug)}
        >
          <AiFillDislike />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: process.env.GRAPH_TOKEN,
    },
  })
  const pageSlug = context.query.slug

  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `
  const variables = {
    pageSlug,
  }

  const data = await graphQLClient.request(query, variables)
  const video = data.video

  return {
    props: {
      video,
    },
  }
}

export default Video
