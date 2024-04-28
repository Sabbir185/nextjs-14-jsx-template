import wait from "@/utilities/wait";

export async function getCatFacts(type, delay = false) {
    let fetchOptions = {};
    if (type === "dynamic") {
        fetchOptions = {
            cache: "no-store",
        };
    }
    const res = await fetch("https://catfact.ninja/fact", fetchOptions);
    if (delay) await wait(2000);
    return res.json();
}

export async function getPosts(type, delay = false) {
    let fetchOptions = {};
    if (type === "dynamic") {
        fetchOptions = {
            cache: "no-store",
        };
    } else if (type === "revalidated") {
        fetchOptions = {
            next: {
                revalidate: 10, // second
            },
        };
    }
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?limit=5`,
        fetchOptions
    );
    if (delay) await wait(2000);
    return res.json();
}

export async function getPost(postId) {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return res.json();
}

export async function getUser(userId) {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
            cache: "no-store",
        }
    );
    await wait(4000);
    return res.json();
}
