from django.contrib import admin

# Register your models here.

from geonode.contrib.monitoring.models import (
    Host, 
    Service, 
    ServiceType, 
    ServiceTypeMetric, 
    Metric, 
    RequestEvent, 
    ExceptionEvent, 
    MetricLabel, 
    MonitoredResource,
    NotificationCheck,
    MetricNotificationCheck,
    )


@admin.register(Host)
class HostAdmin(admin.ModelAdmin):
    list_display = ('name', 'active',)


@admin.register(ServiceType)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'host_name', 'service_type',)

    def host_name(self, obj):
        return obj.host.name

    def service_type(self, obj):
        return obj.service_type.name

    list_select_related = True

@admin.register(ServiceTypeMetric)
class ServiceTypeMetricAdmin(admin.ModelAdmin):
    list_display = ('service_type', 'metric',)
    list_select_related = True


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ('name','type',)
    list_filter = ('type',)


@admin.register(RequestEvent)
class RequestEvent(admin.ModelAdmin):
    list_display = ('service', 'created', 'request_method', 'request_path', 'response_status', 'ows_service', 'response_size', 'client_country',)
    list_filter = ('host', 'request_method', 'response_status', 'ows_service',)


@admin.register(MetricLabel)
class MetricLabelAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(MonitoredResource)
class MonitoredResourceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type',)
    list_filter = ('type',)


@admin.register(ExceptionEvent)
class ExceptionEventAdmin(admin.ModelAdmin):
    list_display = ('created', 'service', 'error_type',)


@admin.register(NotificationCheck)
class NotificationCheckAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

@admin.register(MetricNotificationCheck)
class MetricNotificationCheckAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'notification_check', 'metric', 'min_value', 'max_value', 'max_timeout',)
    raw_id_fields= ('user', 'notification_check', 'resource', 'label',)