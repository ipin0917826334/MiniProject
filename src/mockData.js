export const mockTopics = [
    {
      id: 1,
      title: "React vs Angular",
      description: "Discussing the pros and cons of React and Angular.",
      likes: 3,
      dislikes: 1,
      posts: [
        {
          id: "1",
          author: "John Doe",
          content: "I prefer React because it's more flexible and has a larger community.",
          likes: 3,
          dislikes: 1,
        },
        {
            id: "2",
            author: "รักนะ",
            content: "ไอสัส",
            likes: 56,
            dislikes: 2,
        },
      ],
    },
  ];
  export function addNewTopic(topic) {
    const newId = Math.max(...mockTopics.map((t) => t.id)) + 1;
    const newTopic = { ...topic, id: newId, posts: [] };
    mockTopics.push(newTopic);
    return newTopic;
  }