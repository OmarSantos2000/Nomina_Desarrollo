﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Proyecto_Web_Api.Context;

#nullable disable

namespace Proyecto_Web_Api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Cargo", b =>
                {
                    b.Property<int>("CargoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CargoId"), 1L, 1);

                    b.Property<int>("DepartamentoId")
                        .HasColumnType("int");

                    b.Property<string>("Nombre_cargo")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("CargoId");

                    b.HasIndex("DepartamentoId");

                    b.ToTable("Cargo");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Departamento", b =>
                {
                    b.Property<int>("DepartamentoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DepartamentoId"), 1L, 1);

                    b.Property<string>("Nombre_Depto")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("DepartamentoId");

                    b.ToTable("Departamento");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Empleado", b =>
                {
                    b.Property<int>("EmpleadoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmpleadoId"), 1L, 1);

                    b.Property<string>("Apellidos")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("CargoId")
                        .HasColumnType("int");

                    b.Property<string>("Direccion")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Nombres")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("NominaId")
                        .HasColumnType("int");

                    b.Property<int?>("Telefono")
                        .HasColumnType("int");

                    b.HasKey("EmpleadoId");

                    b.HasIndex("CargoId");

                    b.HasIndex("NominaId");

                    b.ToTable("Empleado");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Login", b =>
                {
                    b.Property<int>("LoginId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LoginId"), 1L, 1);

                    b.Property<string>("Clave")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Usuario")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LoginId");

                    b.ToTable("Login");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Nomina", b =>
                {
                    b.Property<int>("NominaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NominaId"), 1L, 1);

                    b.Property<int?>("Horas")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("Sueldo")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("ValorHora")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("NominaId");

                    b.ToTable("Nomina");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Cargo", b =>
                {
                    b.HasOne("Proyecto_Web_Api.Entities.Departamento", "Departamento")
                        .WithMany("Cargos")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Empleado", b =>
                {
                    b.HasOne("Proyecto_Web_Api.Entities.Cargo", "Cargo")
                        .WithMany("Empleados")
                        .HasForeignKey("CargoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Proyecto_Web_Api.Entities.Nomina", "Nomina")
                        .WithMany("Empleados")
                        .HasForeignKey("NominaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cargo");

                    b.Navigation("Nomina");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Cargo", b =>
                {
                    b.Navigation("Empleados");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Departamento", b =>
                {
                    b.Navigation("Cargos");
                });

            modelBuilder.Entity("Proyecto_Web_Api.Entities.Nomina", b =>
                {
                    b.Navigation("Empleados");
                });
#pragma warning restore 612, 618
        }
    }
}
