package com.example.config;

import java.io.IOException;
import java.time.Duration;

import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class IndexHtmlConfig implements WebMvcConfigurer {

	private final WebProperties webProperties;

	public IndexHtmlConfig(final WebProperties webProperties) {
		this.webProperties = webProperties;
	}

	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**")
				.addResourceLocations("classpath:/static/")
				.setCachePeriod(getSeconds(webProperties.getResources().getCache().getPeriod()))
				.setCacheControl(
						webProperties.getResources().getCache().getCachecontrol().toHttpCacheControl())
				.resourceChain(true)
				.addResolver(new IndexHtmlResourceResolver());
	}

	private static Integer getSeconds(final Duration cachePeriod) {
		return (cachePeriod != null) ? (int) cachePeriod.getSeconds() : null;
	}

	private static class IndexHtmlResourceResolver extends PathResourceResolver {
		@Override
		protected Resource getResource(final String resourcePath,
				final Resource location)
				throws IOException {
			final Resource resource = super.getResource(resourcePath, location);
			if (resource != null) {
				return resource;
			}
			return super.getResource("index.html", location);
		}
	}
}
