export enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

export const fetchApi = async (
  url: string,
  httpMethod: HttpMethod = HttpMethod.GET,
  token: string = '',
  body: any = null,
  headersMap?: Map<string, string>
): Promise<any> => {

  const method = HttpMethod[httpMethod]
  let res: Promise<any>
  let headers: Headers = new Headers()

  if (token != '') {
    headers.append("Authorization", `Bearer ${token}`)
  }
  if (headersMap != null) {
    headersMap.forEach((value, key) => {
      headers.append(value, key)
    })
  }

  console.log(method)

  try {
    const fetchResponse = await fetch(
      url,
      {
        body,
        method,
        headers
      }
    )
    console.log(fetchResponse.status)
    res = await fetchResponse.json()
  }
  catch (e) {
    console.log('error fetching')
    console.log(e)
    return Promise.reject(e)
  }
  return Promise.resolve(res)
}
