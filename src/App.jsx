import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading]= useState(0);
  const [video, setVideo] = useState(0);
  const [musik, setMusic] = useState(0);
  const [videoSrc, setVideoSrc]= useState(0);

  const base_url = 'https://api.tiklydown.eu.org/api'

  const submitDownload = (e) => {
    setLoading(1);
    e.preventDefault();
    fetch(`${base_url}/download/v3?url=${encodeURIComponent(url)}`)
    .then((response) => response.json()
    .then((data) => {
      if (data.status == 200) {
        const result = data.result
        setVideo(data.result.video);
        setMusic(data.result.music);        
        setVideoSrc(result.video);

        setLoading(0);
      } else {
        alert('failed to fetch download links. please check the url and try again')
      }
    }))
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="overlay w-full h-screen">
          <div className="container mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-black">
              Tiktok Downloader
            </h1>
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
              <form id="download-form" className="space-y-4" onSubmit={(e) => submitDownload(e)}>
                <div>
                  <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-1">
                    Tiktok URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    id="url"
                    name="url"
                    required
                    className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Masukkan URL video Tiktok"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-700 transition-colors"
                  >
                    {loading ? "Loading..." : "Download"}
                  </button>
                </div>
              </form>

              {!loading && video ? (
                <div id="result" className="mt-8">
                  <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Result</h2>
                  <div className="flex gap-4 justify-center">
                    <a
                      href={video}
                      className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Video
                    </a>
                    <a
                      href={musik}
                      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Music
                    </a>
                  </div>
                  <video
                    src={videoSrc}
                    id="video-result"
                    type="video/mp4"
                    controls
                    className="video-result mt-6 mx-auto rounded-lg"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
