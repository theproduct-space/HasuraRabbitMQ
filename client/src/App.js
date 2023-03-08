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
      let date = new Date(element.created_at);
      return (
        <div key={element.id} style={{display: "flex", flexDirection: "row"}}>
          <div style={{width: "180px"}}>
            [{date.toLocaleString('en-GB')}]
          </div>
          <div>
            {element.content}
          </div>
        </div>
      );
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3>Messages :</h3>
      <div style={{display : "flex", flexDirection: "column"}}>
        {printData(data)}
      </div>
    </div>
  );
}

export default App;
