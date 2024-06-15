import { objectToQueryString } from "@/lib/utils"
import { redirect } from "next/navigation"

export default function callback(
  {
    params,
    searchParams,
  }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
  redirect('/?' + objectToQueryString(searchParams))
}