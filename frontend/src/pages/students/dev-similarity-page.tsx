export default function DevSimilarityPage() {
  return (
    <div className="grid grid-cols-2 p-6">
      <div>
        <label
          htmlFor="doc1"
          className="mb-4 text-xl font-bold text-orange-900"
        >
          Document 1
        </label>
        <textarea
          className="w-11/12 rounded-md border px-4 py-2 shadow-sm shadow-black/5"
          name="doc1"
          id="doc1"
          rows={5}
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="doc2"
          className="mb-4 text-xl font-bold text-orange-900"
        >
          Document 2
        </label>
        <textarea
          className="w-11/12 rounded-md border px-4 py-2 shadow-sm shadow-black/5"
          name="doc2"
          id="doc2"
          rows={5}
        ></textarea>
      </div>
    </div>
  );
}
