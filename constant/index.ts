export const API_URL = "http://localhost:8080"

export const SAMPLE_THREAD: IThread[] = [
  { _id: 'content_id_0', title: 'Title_0', content: 'content_content_content_content_content_content' },
  { _id: 'content_id_1', title: 'Title_1', content: 'content_content_content_content_content_content' },
  { _id: 'content_id_2', title: 'Title_2', content: 'content_content_content_content_content_content' },
  { _id: 'content_id_3', title: 'Title_3', content: 'content_content_content_content_content_content' },
  { _id: 'content_id_4', title: 'Title_4', content: 'content_content_content_content_content_content' },
  { _id: 'content_id_5', title: 'Title_5', content: 'content_content_content_content_content_content' },
]

interface IThread {
  _id: string
  title: string
  content: string
}