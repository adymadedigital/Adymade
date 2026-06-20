<script lang="ts">
	import { MessageCircle } from 'lucide-svelte';
</script>

<footer>
	<div class="container">
		<div class="footer-grid">
			<!-- Brand Column -->
			<div class="foot-brand">
				<a href="/" class="logo-wrap">
					<div class="logo-icon">A</div>
					<span class="logo-text">adymade</span>
				</a>
				<p>
					A global AI and digital agency based in Indore, India. Serving clients across India, Saudi
					Arabia, UAE, UK, Australia, and beyond.
				</p>
				<div class="socials">
					<a href="https://linkedin.com/company/adymade"  class="soc" aria-label="LinkedIn"   target="_blank" rel="noopener"><span>in</span></a>
					<a href="https://instagram.com/adymade"         class="soc" aria-label="Instagram"  target="_blank" rel="noopener"><span>ig</span></a>
					<a href="https://youtube.com/@adymade"          class="soc" aria-label="YouTube"    target="_blank" rel="noopener"><span>yt</span></a>
					<a href="https://wa.link/u03r6i"                class="soc" aria-label="WhatsApp"   target="_blank" rel="noopener"><MessageCircle size={16} /></a>
				</div>
			</div>

			<!-- Services -->
			<div class="foot-col">
				<h5>Services</h5>
				<ul>
					<li><a href="/ai-automation">AI Automation</a></li>
					<li><a href="/ai-videos">AI Videos</a></li>
					<li><a href="/compliance-videos">Compliance Videos</a></li>
					<li><a href="/web-development">Web Development</a></li>
					<li><a href="/software-development">Custom Software</a></li>
					<li><a href="/digital-marketing">Digital Marketing</a></li>
					<li><a href="/geo">GEO Services</a></li>
				</ul>
			</div>

			<!-- Industries -->
			<div class="foot-col">
				<h5>Industries</h5>
				<ul>
					<li><a href="/industries/construction">Construction</a></li>
					<li><a href="/industries/healthcare">Healthcare</a></li>
					<li><a href="/industries/ecommerce">E-commerce</a></li>
					<li><a href="/industries/saas">SaaS &amp; Tech</a></li>
				</ul>
			</div>

			<!-- Company -->
			<div class="foot-col">
				<h5>Company</h5>
				<ul>
					<li><a href="/about">About Us</a></li>
					<li><a href="/case-studies">Case Studies</a></li>
					<li><a href="/pricing">Pricing</a></li>
					<li><a href="/blog">Blog</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</div>

			<!-- Contact -->
			<div class="foot-col">
				<h5>Contact</h5>
				<ul>
					<li><a href="mailto:contact@adymade.com">contact@adymade.com</a></li>
					<li><a href="https://wa.link/u03r6i" target="_blank" rel="noopener">WhatsApp us</a></li>
					<li>
						<a
							href="https://calendly.com/addymade/15-minute-consultation-call"
							target="_blank"
							rel="noopener"
						>
							Book a free call
						</a>
					</li>
					<li><span class="foot-address">Indore, M.P., India</span></li>
				</ul>
				<div class="currency-badge">
					<div class="currency-label">We accept</div>
					<div class="currency-values">₹ INR · $ USD · £ GBP · د.إ AED · ر.س SAR</div>
				</div>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="foot-bottom">
			<p>© 2025 Adymade Digital LLP. All rights reserved. Made with care in Indore 🇮🇳</p>
			<div class="foot-legal">
				<a href="/privacy">Privacy Policy</a>
				<a href="/terms">Terms of Service</a>
			</div>
		</div>
	</div>
</footer>
