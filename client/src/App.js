import { useSubscription, gql } from "@apollo/client";

const MESSAGE_SUBSCRIPTION = gql`
  subscription onMessageAdded {
    messages(order_by: {created_at: desc}) {
      id
      content
      created_at
      updated_at
    }
  }
`;

function App() {
  const { data, loading } = useSubscription(
    MESSAGE_SUBSCRIPTION
  );

  const printData = (data) => {
    console.log(data);
    return data.messages.map(element => {
      return <div key={element.id}>{element.content}</div>
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        {printData(data)}
      </div>
    </div>
  );
}

export default App;
