import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import ImagePreview from '../components/ImagePreview'

export default function Home({items}) {
  const [search, setSearch] = useState("");
  const [photos, setPhotos] = useState(items);
  return (
    <div className={styles.container}>
      <Head>
        <title>Nasa Image gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to Nasa Image gallery</h1>
        {photos 
         && photos.map((preview)=>(
          <ImagePreview
           key={preview.data[0].nasa_id}
           thumbnailUrl ={preview.data[0].href}
           nasaId ={preview.data[0].nasa_id}
           />
        ))}
      </main>

    
    </div>
  )
}
export async function getStaticProps(){
  const response = await fetch("https://images-api.nasa.gov/search?media_type=image") ;
  const previews = await response.json();
  const items =await previews.collection.items;

 return {
    props: {items},
 }
}