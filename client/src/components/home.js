import Card from './card';

export default function Home(){
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank-icon-17.jpg" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
