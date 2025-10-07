function zipperApp() {
    return {
    searchQuery: '',
    selectedCategory: '',
    selectedService: '',
    selectedBudget: '',
    selectedRated: '',
    selectedIndustry: '',
    loading: false,

    categories: ['CRM, Customer Service & Sales', 'File Syncing, Storage & Sharing Platform', 'Project Management'],
    services: ['Customer Support', 'Data Storage', 'Analytics'],
    budgets: ['$0 - $49', '$50 - $199', '$200+'],
    rateds: ['4.4', '5.2', '4.1', '3.2'],
    industries: ['Technology', 'Healthcare', 'Finance'],

    allProducts: [
        {
        name: 'Zendesk',
        category: 'CRM, Customer Service & Sales',
        service: 'Customer Support',
        budget: '$0 - $49',
        price: '$1 - $49 / Month',
        rating: '4.4',
        reviews: '4.6k Reviews',
        industry: 'Technology',
        image: 'assets/images/zendesk.png',
        description: 'Zendesk offers customer service and engagement products serving over 165,000 businesses worldwide.'
        },
        {
        name: 'Dropbox',
        category: 'File Syncing, Storage & Sharing Platform',
        service: 'Data Storage',
        budget: '$0 - $49',
        price: '$12 - $49 / Month',
        rating: '5.2',
        reviews: '3.2k Reviews',
        industry: 'Technology',
        image: 'assets/images/dropbox.png',
        description: 'Dropbox helps teams store, sync, and share files securely across devices with reliable cloud storage.'
        },
        {
        name: 'Asana',
        category: 'Project Management',
        service: 'Analytics',
        budget: '$50 - $199',
        price: '$50 - $79 / Month',
        rating: '4.1',
        reviews: '2.1k Reviews',
        industry: 'Finance',
        image: 'assets/images/asana.png',
        description: 'Asana offers inbound marketing, sales, and CRM software to help companies grow better.'
        }
    ],

    filteredProducts: [],

    init() {
        this.filteredProducts = this.allProducts;
        this.$nextTick(() => {
            document.addEventListener('click', (e) => {
            if (e.target.closest('.no-toggle')) {
                const summary = e.target.closest('summary');
                if (summary) {
                e.stopPropagation();
                e.preventDefault();
                }
            }
            }, true);
        });
    },

    filterProducts() {
        this.loading = true;
        setTimeout(() => {
        const query = this.searchQuery.toLowerCase();
        this.filteredProducts = this.allProducts.filter(p => {
            const matchesQuery = p.name.toLowerCase().includes(query)
            || p.category.toLowerCase().includes(query)
            || p.service.toLowerCase().includes(query);
            const matchesCategory = !this.selectedCategory || p.category === this.selectedCategory;
            const matchesService = !this.selectedService || p.service === this.selectedService;
            const matchesBudget = !this.selectedBudget || p.budget === this.selectedBudget;
            const matchesRated = !this.selectedRated || p.rating >= parseFloat(this.selectedRated);
            const matchesIndustry = !this.selectedIndustry || p.industry === this.selectedIndustry;
            return matchesQuery && matchesCategory && matchesService && matchesBudget && matchesRated && matchesIndustry;
        });
        this.loading = false;
        }, 500); // simulate loading
    }
    };
}

// read more functionality
document.addEventListener("DOMContentLoaded", () => {
const maxChars = 200;
const elements = document.querySelectorAll(".expandable-view-inner");

elements.forEach((el) => {
const fullText = el.textContent.trim();

if (fullText.length > maxChars) {
    const shortText = fullText.substring(0, maxChars) + "...";
    const toggle = document.createElement("span");
    toggle.classList.add("read-toggle");
    toggle.textContent = "Read more";

    // wrap original text
    const contentSpan = document.createElement("span");
    contentSpan.textContent = shortText;
    el.textContent = "";
    el.appendChild(contentSpan);
    el.appendChild(toggle);

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isExpanded = el.classList.toggle("expanded");

            if (isExpanded) {
            contentSpan.textContent = fullText;
            toggle.textContent = "Read less";
            } else {
            contentSpan.textContent = shortText;
            toggle.textContent = "Read more";
            }
        });
        }
    });
});