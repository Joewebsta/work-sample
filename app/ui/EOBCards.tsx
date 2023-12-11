"use client";
import { Bundle, ExplanationOfBenefit } from "fhir/r4";
import { capitalize, formatDate } from "../lib/utils";

export default function EOBCards({ EOBData }: { EOBData: Bundle }) {
  if (!EOBData.entry || EOBData.entry.length === 0) {
    return <p className="text-center">No Explanation of Benefits data.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {EOBData.entry.map((entry) => {
        const resource: ExplanationOfBenefit =
          entry.resource as ExplanationOfBenefit;
        const type = resource.type?.coding?.[0].display ?? "-";
        const outcome =
          resource.outcome === undefined ? "-" : capitalize(resource.outcome);
        const payment = resource.payment;
        const paymentValue = payment?.amount?.value?.toFixed(2) ?? 0;
        const paymentCurrency = payment?.amount?.currency ?? "USD";
        const paymentType = payment?.type?.coding?.[0].code ?? "-";
        const paymentDate = payment?.date ?? "-";
        const insurer = resource.insurer?.display ?? "-";
        const provider = resource.provider?.display ?? "-";
        const providerNPI = resource.provider?.identifier?.value ?? "-";
        const billableStart = formatDate(resource.billablePeriod?.start) ?? "-";
        const billableEnd = formatDate(resource.billablePeriod?.end) ?? "-";

        return (
          <div
            className="border-t border-gray-200 bg-white drop-shadow-md rounded"
            key={entry.id}
          >
            <dl className="divide-y divide-gray-200">
              <EOBCardRow label={"Type"} content={type} />
              <EOBCardRow label={"Outcome"} content={outcome} />
              <EOBCardRow
                label={"Payment Amount"}
                content={`${paymentValue} ${paymentCurrency}`}
              />
              <EOBCardRow
                label={"Payment Type"}
                content={paymentType ? capitalize(paymentType) : "-"}
              />
              <EOBCardRow label={"Payment Date"} content={paymentDate ?? "-"} />
              <EOBCardRow label={"Insurer"} content={insurer} />
              <EOBCardRow label={"Provider"} content={provider} />
              <EOBCardRow label={"Provider NPI"} content={providerNPI} />
              <EOBCardRow label={"Billable Start"} content={billableStart} />
              <EOBCardRow label={"Billable End"} content={billableEnd} />
            </dl>
          </div>
        );
      })}
    </div>
  );
}

function EOBCardRow({ label, content }: { label: string; content: string }) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 ">
      <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {content}
      </dd>
    </div>
  );
}
