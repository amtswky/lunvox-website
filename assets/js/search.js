<script src="https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js"></script>
<script>
  // 1) Algolia istemcisini başlat
  const searchClient = algoliasearch(
    'O1ATGK47NF',                     // senin Application ID’n
    '0ae3e9fb563a03c16b8c53cdbbfd5b9a' // Algolia Search‑Only API Key’in
  );

  // 2) Lunvox üye index’ini başlat
  const index = searchClient.initIndex('lunvox_members');

  // 3) Input’a event listener ekle
  const searchBox = document.getElementById('searchBox');
  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'searchResults';
  document.getElementById('search').appendChild(resultsContainer);

  searchBox.addEventListener('input', async (e) => {
    const query = e.target.value;
    if (!query) {
      resultsContainer.innerHTML = '';
      return;
    }
    // 4) Algolia’dan arama yap
    const { hits } = await index.search(query);
    // 5) Çıkan sonuçları listele
    resultsContainer.innerHTML = hits
      .map(hit => `
        <div class="hit">
          <strong>${hit['ÜNVAN']}</strong><br>
          <small>${hit['MESLEK KOMİTESİ TANIMI']} – ${hit['NACE TANIM']}</small><br>
          <small>${hit['ADRES']}</small>
        </div>
      `).join('');
  });
</script>
