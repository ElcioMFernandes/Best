"use client";
import ExpandableCard from "@/components/ExpandableCard";
import { Frame } from "@/components/Frame";
import { List } from "@/components/List";
import useAuth from "@/hooks/useAuth";

const Transactions = () => {
  const isLoading = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Frame displayNavBar={true} displayFooter={true}>
        <List title="Extrato">
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#111</li>
                <li className="border-r pr-4">Débito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 1</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#112</li>
                <li className="border-r pr-4">Crédito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 2</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#113</li>
                <li className="border-r pr-4">Débito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 3</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#121</li>
                <li className="border-r pr-4">Débito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 4</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#122</li>
                <li className="border-r pr-4">Crédito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 5</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#123</li>
                <li className="border-r pr-4">Débito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 6</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#131</li>
                <li className="border-r pr-4">Crédito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 7</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#132</li>
                <li className="border-r pr-4">Débito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 8</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#133</li>
                <li className="border-r pr-4">Débito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 9</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#211</li>
                <li className="border-r pr-4">Crédito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 10</p>}
          />
          <ExpandableCard
            resumedContent={
              <ul className="flex gap-4">
                <li className="border-r pr-4">#212</li>
                <li className="border-r pr-4">Crédito</li>
                <li className="pr-4">24/01/2024</li>
              </ul>
            }
            expandedContent={<p>Este é o conteúdo expandido 11</p>}
          />
        </List>
      </Frame>
    </>
  );
};

export default Transactions;
