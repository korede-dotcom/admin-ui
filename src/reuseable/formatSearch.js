export const formatUserSearch = (data) => {
    return data?.map(d => {
        return{
            value:d?.user_id,
            label:d?.user.name
        }
    })
}